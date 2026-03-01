import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const { ingredients, dietaryFilters } = await request.json()

    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json(
        { error: "Please provide at least one ingredient" },
        { status: 400 }
      )
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
    const apiToken = process.env.CLOUDFLARE_API_TOKEN

    if (!accountId || !apiToken) {
      return NextResponse.json(
        { error: "Cloudflare credentials not configured" },
        { status: 500 }
      )
    }

    // Build dietary constraints
    const dietaryConstraints = dietaryFilters?.length
      ? `Dietary requirements: ${dietaryFilters.join(", ")}.`
      : ""

    const prompt = `
You are an expert vegetarian chef.

Create a delicious, creative vegetarian recipe using these ingredients:
${ingredients.join(", ")}.

${dietaryConstraints}

Return ONLY valid JSON in this exact format.
All string values must use double quotes.
Do not include markdown.
Do not include explanations.
Do not include text before or after JSON.

{
  "name": "Recipe Name",
  "description": "A brief, appetizing description",
  "servings": "number",
  "prepTime": "time in minutes",
  "cookTime": "time in minutes",
  "difficulty": "Easy/Medium/Hard",
  "ingredients": [{"name": "ingredient", "amount": "quantity"}],
  "instructions": ["step 1", "step 2"],
  "tips": ["tip 1", "tip 2"],
  "nutrition": {"calories": "approximate", "protein": "grams"}
}
`

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3-8b-instruct`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          temperature: 0.2,
          max_tokens: 900,
          response_format: { type: "json_object" }, // 🔥 Forces valid JSON
        }),
      }
    )

    // 🔴 Handle API error (read body only once)
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Cloudflare API error:", errorText)

      return NextResponse.json(
        { error: "Failed to generate recipe", details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()

    if (!data.success) {
      console.error("Cloudflare returned unsuccessful response:", data)
      return NextResponse.json(
        { error: "Cloudflare AI failed" },
        { status: 500 }
      )
    }

    const textContent = data.result?.response

    if (!textContent) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      )
    }

    let recipe

    try {
      recipe = JSON.parse(textContent)
    } catch (parseError) {
      console.error("JSON Parse Error:", textContent)

      return NextResponse.json(
        { error: "AI returned malformed JSON. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      recipe,
    })
  } catch (error) {
    console.error("Recipe generation error:", error)

    return NextResponse.json(
      { error: "Failed to generate recipe. Please try again." },
      { status: 500 }
    )
  }
}