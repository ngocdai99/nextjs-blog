
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Description bla blah'
}
export default function Home() {
  return (
    <main>
      <ul
        style={{
          display: "flex",
          gap: 8,
          flexDirection: "column",
          padding: 32,
        }}
      >
        <Link className="nav-link" href={"/facebook"}>
          Face book
        </Link>
        <Link href={"/youtube"} className="nav-link">
          Youtube
        </Link>
        <Link href={"/tiktok"} className="nav-link">
          Tiktok
        </Link>
      </ul>
    </main>
  );
}
