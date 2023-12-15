import { Container } from "@mui/material";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../App";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSignIn, useSignOut } from "react-auth-kit";

export default function SupabaseLogin() {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const signOut = useSignOut();
  const [session, setSession] = useState(null);

  useEffect(() => {
    // When this is on the home page
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session === null || session === undefined) {
        return;
      }

      const user = await supabase.auth.getUser();
      const userId = user.data.user.id;
      if (userId === null || userId === undefined) {
        setSession(null);
        await supabase.auth.signOut();
        signOut();
        navigate("/");
      }

      if (
        signIn({
          token: session.access_token,
          expiresIn: session.expires_in,
          tokenType: session.token_type,
          authState: {
            userId: userId,
            email: user.data.user.email,
            name: user.data.user.user_metadata.name,
          },
        })
      ) {
        navigate("/home");
        setSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, signIn, signOut]);

  if (!session) {
    return (
      <Container className="container">
        <Auth
          supabaseClient={supabase}
          theme="dark"
          appearance={{ theme: ThemeSupa }}
          providers={["google", "twitter"]}
        />
      </Container>
    );
  } else {
    return <div></div>;
  }
}
