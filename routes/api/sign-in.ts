import { Handlers } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";

import { supabase } from "lib/supabase.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const form = await req.formData();

    const headers = new Headers();
    headers.set("location", "/sign-in-code");

    const email = String(form.get("email Address *"));

    const { error } = await supabase.auth
      .signInWithOtp({
        email,
      });

    if (error != null) {
      // TODO: Add some actual error handling. Differentiate between 500 & 403.
      console.log(error);
      return new Response(null, { status: 500 });
    }

    setCookie(headers, {
      name: "authEmail",
      value: email,
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
