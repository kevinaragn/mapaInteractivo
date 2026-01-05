import { motion } from "framer-motion";
import { MapPinned } from "lucide-react";

export default function SidebarNodes({ nodes, activeNode, onSelect }) {
  return (
    <aside className="relative h-full font-serif">

      {/* PANEL TRANSLÚCIDO */}
      <div
        className="
          absolute
          inset-y-4
          inset-x-2
          rounded-2xl
          bg-black/10
          backdrop-blur-sm
          border border-white/10
          shadow-2xl
        "
      />

      {/* CONTENIDO */}
      <div className="relative z-10 h-full flex flex-col px-8">

        {/* TÍTULO */}
        <div className="flex items-center gap-3 pt-20 pb-15">
          <MapPinned size={20} className="text-white/80" />
          <h2 className="text-white/90 text-xl tracking-wide">
                Avenida León Gallardo
          </h2>
        </div>

        {/* CUERPO */}
        <div className="relative flex-1 flex justify-center">

          {/* LÍNEA METRO */}
          <div
            className="
              absolute
              left-2
              top-6
              bottom-9
              w-2
              bg-white/25
            "
          />

          {/* ESTACIONES */}
          <div className="flex flex-col gap-14 pl-6 justify-center">
            {nodes.map((node) => {
              const isActive = node.key === activeNode;

              return (
                <motion.button
                  key={node.key}
                  onClick={() => onSelect(node.key)}
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0.65 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex items-center gap-4 text-left"
                >
                  {/* CÍRCULO */}
                  <motion.span
                    className={`
                      relative z-10
                      w-4 h-4 rounded-full border
                      ${isActive
                        ? "bg-white border-white"
                        : "bg-black border-white/40"}
                    `}
                    animate={
                      isActive
                        ? { scale: [1, 1.35, 1] }
                        : { scale: 1 }
                    }
                    transition={{
                      duration: 1.6,
                      repeat: isActive ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />

                  {/* TEXTO */}
                  <span
                    className={`
                      text-lg md:text-2xl
                      tracking-wide
                      ${isActive ? "text-white" : "text-white/70"}
                    `}
                  >
                    {node.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
