import Link from "next/link";
import Layout from "../components/Layout";

import { ThemeProvider, Text } from "theme-ui";
import Prism from "@theme-ui/prism";

import theme from "../theme";

const components = {
  pre: ({ children }: { children: React.ReactChildren }) => <>{children}</>,
  code: Prism,
};

const IndexPage = () => (
  <ThemeProvider theme={theme} components={components}>
    <Layout title="Spaceboard">
      <h1>Spaceboard</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <Text>`ctrl+shift+l` to create new card</Text>
      <br></br>
    </Layout>
  </ThemeProvider>
);

export default IndexPage;
