import { motion } from "framer-motion";

export default function MetricCard({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change: string;
  icon: any;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.04] p-5 shadow-xl shadow-black/20"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</h3>
          <p className="mt-2 text-sm text-emerald-300">{change}</p>
        </div>
        <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  );
}