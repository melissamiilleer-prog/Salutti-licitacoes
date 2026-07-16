import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader, SiteFooter, WhatsFab } from "../components/SiteChrome";

function NotFoundComponent() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="section">
          <div className="wrap" style={{ textAlign: "center", maxWidth: 560 }}>
            <p className="eyebrow"><span className="eyebrow-dot"></span>404</p>
            <h1>Página não encontrada</h1>
            <p className="section-sub" style={{ margin: "0 auto 24px" }}>
              A página que você procura não existe ou foi movida.
            </p>
            <Link to="/" className="btn btn-brass btn-lg">Voltar ao início</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <main>
      <section className="section">
        <div className="wrap" style={{ textAlign: "center", maxWidth: 560 }}>
          <h1>Algo deu errado</h1>
          <p className="section-sub" style={{ margin: "0 auto 24px" }}>
            Tente novamente ou volte ao início.
          </p>
          <button
            className="btn btn-brass btn-lg"
            onClick={() => { router.invalidate(); reset(); }}
          >
            Tentar novamente
          </button>
        </div>
      </section>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Salutti Empresarial | Consultoria em Licitações Públicas" },
      {
        name: "description",
        content:
          "Consultoria especializada em licitações públicas municipais, estaduais e federais. Transforme licitações em negócios rentáveis.",
      },
      { name: "author", content: "Salutti Empresarial" },
      { property: "og:title", content: "Salutti Empresarial | Consultoria em Licitações Públicas" },
      {
        property: "og:description",
        content: "Apoiamos sua empresa em cada etapa do processo licitatório com clareza e eficiência.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/assets/logo.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500;600&family=Source+Sans+3:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
      <WhatsFab />
    </QueryClientProvider>
  );
}
