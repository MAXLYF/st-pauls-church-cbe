import { redirect } from "next/navigation";

export default function MassReadingsAliasPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  redirect("/daily-mass-readings");
}
