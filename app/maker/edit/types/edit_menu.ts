export interface editMenu {
  id: number;
  backgroundImage: string | File | null; // ✅ Acepta URL o archivo nuevo
  color: {
    primary: string;
    secondary: string;
  };
  logo: string | File | null; // ✅ Acepta URL o archivo nuevo
  pos: string;
  title: string;
}

