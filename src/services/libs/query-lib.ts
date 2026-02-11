/// <reference types="vite/client" />
import { createClient } from "@supabase/supabase-js";

// Configuración de Supabase - Reemplazar con tus credenciales
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY || "";

export const querylib = createClient(supabaseUrl, supabaseAnonKey);