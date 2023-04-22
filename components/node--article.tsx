import Image from "next/image"

import {absoluteUrl, formatDate} from "lib/utils"
import {CustomNode} from "../types/drupal";
import Link from "next/link";
import {ComponentManager} from "./ComponentManager";


interface NodeArticleProps {
  node: CustomNode
}

export function NodeArticle({node, ...props}: NodeArticleProps) {
  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
      <div className="mb-4 text-gray-600">
        {node.uid?.display_name ? (
          <span>
            Posted by{" "}
            <span className="font-semibold">{node.uid?.display_name}</span>
          </span>
        ) : null}
        <span> - {formatDate(node.created)}</span>
      </div>
      {node.field_image && (
        <figure>
          <Image
            src={absoluteUrl(node.field_image.uri.url)}
            width={768}
            height={400}
            alt={node.field_image.resourceIdObjMeta.alt}
            priority
          />
          {node.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {node.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {node.body?.processed && (
        <div
          dangerouslySetInnerHTML={{__html: node.body?.processed}}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}

      {node.field_components.length && (
        <div className="mt-6">
          <ComponentManager components={node.field_components} />
        </div>
      )}
      <div className="flex items-center gap-1">
        <h4 className="font-bold">Read more:</h4>
        {node.field_tags.map((tag) => (
          <Link key={tag.id} href={tag.path.alias}>
            <p key={tag.id}>
              {tag.name}
            </p>
          </Link>
        ))}
      </div>
    </article>
  )
}
