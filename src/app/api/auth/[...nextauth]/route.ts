import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
       
            if (account) {
                var date = new Date(0); // The 0 there is the key, which sets the date to the epoch
                date.setUTCSeconds(account.expires_at as number);
                token.id_token = account.id_token;
                token.accessToken = account.accessToken;
                token.refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
                token.expires_at = (account.expires_at as number);
            } else if (Date.now()/1000 > (token.expires_at as number)) {
                //Access token has expired, try to update it
                console.info('Refreshing the token. YEAAAPPP');
                const body = new URLSearchParams();
                body.append('client_id', process.env.GOOGLE_ID as string);
                body.append('client_secret', process.env.GOOGLE_SECRET as string);
                body.append('grant_type', 'refresh_token');
                body.append('refresh_token', token.refreshToken as string);

                const res = await fetch('https://oauth2.googleapis.com/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: body.toString(),
                });
                
                const data = await res.json();
                console.info(data);

                if (res.ok) {
                    token.accessToken = data.access_token;
                    token.id_token = data.id_token;
                    token.expires_at = Date.now()/1000 + data.expires_in;
                } else {
                    console.error('Failed to refresh access token', data);
                }
            }

            return token;
        },
        async session({ session, token }) {
            // HAMMER TIME. STORE THE ID TOKEN IN THE USER NAME PROPERTY
            if (session.user) {
                session.user.name = token.id_token as string;
            }

            return session;
        },
    }
})

export { handler as GET, handler as POST }