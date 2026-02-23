async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const userId = (await params).userId;
  return <div className="text-6xl text-red-500">User Id: {userId}</div>;
}

export default Page;
