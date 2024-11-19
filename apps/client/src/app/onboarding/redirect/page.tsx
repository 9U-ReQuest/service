import RedirectPage from "@/pages/redirect";

export default async function Redirect(props: {
  searchParams: Promise<{ code?: string }>;
}) {
  return <RedirectPage searchParams={props.searchParams} />;
}
