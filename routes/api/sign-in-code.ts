import { Handlers } from "$fresh/server.ts";
import { deleteCookie, getCookies, setCookie } from "std/http/cookie.ts";

import { supabase } from "lib/supabase.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const form = await req.formData();

    const cookies = getCookies(req.headers);
    const email = cookies.authEmail;

    const headers = new Headers();
    headers.set("location", "/");

    const confirmationCode = String(form.get("Confirmation Code"));

    const { data: { user, session }, error } = await supabase.auth
      .verifyOtp({
        type: "magiclink",
        email,
        token: confirmationCode,
      });

    if (error != null || user == null || session == null) {
      // TODO: Add some actual error handling. Differentiate between 500 & 403.
      console.log(error);
      return new Response(null, { status: 500 });
    }

    deleteCookie(headers, "authEmail", { path: "/", domain: url.hostname });

    setCookie(headers, {
      name: "auth",
      value: session.access_token,
      maxAge: session.expires_in,
      sameSite: "Lax",
      domain: url.hostname,
      path: "/",
      secure: true,
    });

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
