import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account?.id_token) {
                token.id_token = account.id_token;
            }
            return token;
        },
        async session({session, token}) {
            // HAMMER TIME. STORE THE ID TOKEN IN THE USER NAME PROPERTY
            if (session.user) {
                session.user.name = token.id_token as string;
            }
      
            return session;
        },
    }
})

export { handler as GET, handler as POST }