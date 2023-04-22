import { drupal } from "lib/drupal"
import { DrupalNode } from "next-drupal";

type AboutPageProps = {
  node: DrupalNode
}

// node will be populated at build time by getStaticProps
export default function AboutPage({ node }: AboutPageProps) {
  console.log(node);

  return (
    <article>
      <p>{node.id}</p>
      <p>{node.title}</p>
    </article>
  )
}

export async function getStaticProps() {
  // Fetch the node from Drupal.
  const node = await drupal.getResource("node--page", "ac732583-427b-4ae7-a205-0298f99c41d4")

  // Pass the node as props to the AboutPage.
  return {
    props: {
      node,
    },
  }
}
