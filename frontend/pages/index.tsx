import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalMenuLinkContent, DrupalNode } from "next-drupal";

import { drupal } from "lib/drupal";
import { Layout, LayoutProps } from "components/layout";
import { NodeArticleTeaser } from "components/node--article--teaser";

interface IndexPageProps {
  nodes: DrupalNode[];
  menus: LayoutProps["menus"];
}

export default function IndexPage({ nodes, menus }: IndexPageProps) {
  return (
    <Layout menus={menus}>
      <Head>
        <title>Next.js for Drupal</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div>
        <h1 className="mb-10 text-6xl font-black">Latest Articles.</h1>
        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id}>
              <NodeArticleTeaser node={node} />
              <hr className="my-20" />
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--article",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--article]": "title,path,field_image,uid,created",
        include: "field_image,uid",
        sort: "-created",
      },
    }
  );

  const mainMenu = await drupal.getMenu("main");

  return {
    props: {
      nodes,
      menus: {
        main: mainMenu.tree,
      },
    },
  };
}
