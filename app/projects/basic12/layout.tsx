export default function Basic12Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-white" style={{backgroundColor: '#000000'}}>
      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
}
