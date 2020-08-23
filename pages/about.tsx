import Link from "next/link";
import Layout from "../components/Layout";

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>About</h1>
    <p>Thank you for trying out Spaceboard!</p>
    <p>
      This is an open-source project. Source:&nbsp;
      <a href="https://github.com/cktang88/spaceboard">
        https://github.com/cktang88/spaceboard
      </a>
      .
    </p>
    <p>
      If you'd like to request features or report a bug, please go{" "}
      <a href="https://github.com/cktang88/spaceboard/issues/new">here</a>.
    </p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default AboutPage;
