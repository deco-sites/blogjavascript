import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { BlogPost } from "apps/blog/types.ts";
import { AppContext } from "site/apps/site.ts";
import { SectionProps } from "deco/mod.ts";

export interface CTA {
  id?: string;
  href?: string;
  text?: string;
  outline?: boolean;
}

/** @title {{{title}}} */
export interface Post {
  url?: string;
  title?: string;
  author?: string;
  excerpt?: string;
  image?: ImageWidget;
  date?: string;
  readingTime?: string;
  tags?: string[];
}

export interface Props {
  post?: BlogPost;
}

export default function MainPost({
  post,
}: SectionProps<typeof loader>) {
  if(!post) return <></>;
  return (
    <div class="container lg:mx-auto lg:py-14 mx-2 py-12 text-sm">
      <div class="space-y-16">
        <a
          href={`/post/${post?.slug}`}
          class="border border-secondary gap-8 grid grid-cols-1 items-center md:grid-cols-2 overflow-hidden rounded-lg"
        >
          {post?.image && (
            <Image
              width={656}
              height={500}
              class="object-fit w-full z-10"
              sizes="(max-width: 656px) 100vw, 30vw"
              src={post?.image || ""}
              alt={post?.image}
              decoding="async"
              loading="lazy"
              id={post.slug.replaceAll(".", "")}
            />
          )}
          <div class="p-6 space-y-4">
            <div class="space-y-2">
              <h3 class="text-2xl" id={`title-${post.slug.replaceAll(".", "")}`}>{post?.title}</h3>
              <p class="text-base">{post?.excerpt}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              {post?.categories?.map((category) => (
                <div class="badge badge-lg badge-primary text-xs">
                  {category.name}
                </div>
              ))}
            </div>
            <div class="flex flex-wrap gap-2">
              <span>
                {post?.date
                  ? new Date(post?.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                  : ""}
              </span>
              <span>•</span>
              <span>{post?.authors[0]?.name}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export const loader = async (_: unknown, req: Request, ctx: AppContext) : Promise<Props> => {
  const posts = await ctx.invoke.blog.loaders.BlogpostList({
    count: 2,
  })
  console.log("posts", posts)
  return {
    post: posts?.[0]
  }
}