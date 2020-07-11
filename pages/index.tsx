import Link from "next/link";
import Layout from "../components/Layout";

import { ThemeProvider } from "theme-ui";
import theme from "../theme";

const IndexPage = () => (
  <ThemeProvider theme={theme}>
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Spaceboard</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  </ThemeProvider>
);

export default IndexPage;
