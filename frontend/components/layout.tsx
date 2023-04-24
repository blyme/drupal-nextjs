import Link from "next/link"

import { PreviewAlert } from "components/preview-alert"
import { DrupalMenuLinkContent } from "next-drupal";

export interface LayoutProps {
  children: React.ReactNode
  menus: {
    main: DrupalMenuLinkContent[]
  }
}

export function Layout({ children, menus }: LayoutProps) {
  return (
    <>
      <PreviewAlert />
      <div className="max-w-screen-md px-6 mx-auto">
        <header className="flex items-center">
          <Link href="/" className="text-lg font font-bold w-64">Drupal next.js.</Link>
          <div className="container py-6 flex justify-end gap-4">
            {menus?.main.map((menuItem) => (
              <Link key={menuItem.id} className="transition-colors hover:text-blue-600" href={menuItem.url}>{menuItem.title}</Link>
            ))}
          </div>
        </header>
        <main className="container py-10 mx-auto">{children}</main>
      </div>
    </>
  )
}
