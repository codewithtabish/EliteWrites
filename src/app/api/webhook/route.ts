import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // Parse webhook request body
        console.log("Received Kinde Webhook:", body);

        const { event, data } = body; // Extract event type and data

        if (event === "user.created") {
            const { id, email, given_name, family_name } = data;

            // Save the user in your database
            await prisma.user.create({
                data: {
                    id,
                    email,
                    name:given_name,

                },
            });

            console.log("User saved to database:", email);
        }

        return NextResponse.json({ message: "Webhook processed successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error processing webhook:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
