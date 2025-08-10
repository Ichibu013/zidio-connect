export default function HeroStatBox({ icon, numbers, heading }) {
  return (
    <div className="text-white rounded-md p-4 flex flex-col items-center">
      <div className="bg-white/20 rounded-md p-2 mb-2">{icon}</div>
      <div className="text-lg font-bold text-white">{numbers}</div>
      <div className="text-sm text-white">{heading}</div>
    </div>
  );
}
