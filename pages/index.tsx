import Link from "next/link";
import Layout from "../components/Layout";

import { ThemeProvider, Text } from "theme-ui";

import theme from "../theme";

const IndexPage = () => (
  <ThemeProvider theme={theme}>
    <Layout title="Spaceboard">
      <h1>Spaceboard</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <Text>`alt+n` to create new card</Text>
      <br></br>
    </Layout>
  </ThemeProvider>
);

export default IndexPage;
