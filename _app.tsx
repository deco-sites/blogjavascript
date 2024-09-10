import { asset, Head } from "deco/runtime/htmx/mod.ts";
import { ComponentChildren } from "preact";

export const Layout = (
  { children, revision, hmrUniqueId }: {
    children: ComponentChildren;
    revision: string;
    hmrUniqueId: string;
  },
) => {
  return (
    <>
      {/* Include Icons and manifest */}
      {/** @ts-ignore: ignore error */}
      <Head>

        {/* Tailwind v3 CSS file */}
        <link
          href={`/styles.css?revision=${revision}${hmrUniqueId}`}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />
      </Head>

      <script src={`/viewTransitions.js`}></script>

      {/* Rest of Preact tree */}
      {children}
    </>
  );
};
