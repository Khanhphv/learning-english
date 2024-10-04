import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    console.log("here");
    // const accessToken = request.cookies.get('accessToken')?.value; 
    // const userRole = request.cookies.get('userRole')?.value; 

    // console.log("Access Token:", accessToken);
    // console.log("User Role:", userRole);

    // if (!accessToken) {
    //     const home = new URL("/", request.url);
    //     return NextResponse.redirect(home);
    // }

    // if (userRole !== "STUDENT") {
    //     const unauthorized = new URL("/unauthorized", request.url);
    //     return NextResponse.redirect(unauthorized);
    // }

    // return NextResponse.next();
}

export const config = {
    matcher: ["/exam/:path*"]
};