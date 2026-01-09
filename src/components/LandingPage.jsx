import { motion } from "framer-motion";

export default function LandingPage({ onStart }) {
  return (
    <div
      className="
        relative w-full overflow-hidden
        h-screen              /* desktop intacto */
        max-md:overflow-hidden
        max-md:min-h-[100dvh]
        max-md:max-h-[100dvh]
      "
    >
      {/* 🔹 Fondo fijo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/fondo-bn.jpg')" }}
      />

      {/* 🔹 Overlay negro animado */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* 🔹 Oscurecedor suave */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* 🔹 LOGO + INSTITUTO */}
      <motion.div
        className="absolute top-6 left-6 z-20 flex items-center gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/logo.ico"
          alt="Logo instituto"
          className="
            w-16 h-16 md:w-20 md:h-20
            rounded-full object-cover border border-white/30 shadow-lg
          "
        />

        <h2 className="text-white text-lg md:text-xl font-semibold tracking-wide">
          Archivo y Museo Historico del Partido de San Miguel
        </h2>
      </motion.div>

      {/* 🔹 CONTENIDO CENTRAL */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
      >
        <h1
          className="text-5xl md:text-6xl font-bold text-white mb-6"
          style={{ fontFamily: "Playfair Display" }}
        >
          San Miguel en la Historia
        </h1>

        <p className="text-gray-200 text-lg md:text-xl mb-10">
          Un tour por la ciudad recreada con Inteligencia Artificial
        </p>

        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          className="
            px-8 py-3 bg-white text-gray-900 rounded-lg
            text-lg font-semibold hover:bg-gray-200
            transition shadow-lg
          "
        >
          Comenzar
        </motion.button>
      </motion.div>

      {/* 🔹 LINKEDIN */}
      <motion.div
        className="absolute bottom-6 left-6 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <a
          href="https://linkedin.com/in/kevinaragn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-lg md:text-xl tracking-wide hover:underline"
        >
          linkedin.com/kevinaragn
        </a>
      </motion.div>
    </div>
  );
}
