export default function LoadingSpinner({ size = 48 }) {
  return (
    <div className="flex justify-center items-center py-8">
      <div
        className="animate-spin rounded-full border-b-2 border-primary-600"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
