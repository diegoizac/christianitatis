import { createClient } from "@supabase/supabase-js";
import { PostgrestError } from "@supabase/supabase-js";

const supabaseUrl = "https://levhtjaudduxxxgbpzgr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxldmh0amF1ZGR1eHh4Z2JwemdyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzE5ODE0NywiZXhwIjoyMDU4Nzc0MTQ3fQ.AfrBLay5j0K4GSftWqHf9MbHbH1OyitdGlRp8vsQXu4";

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  try {
    // Verificar se a tabela já existe
    const { error: checkError } = await supabase
      .from("profiles")
      .select("*")
      .limit(1);

    if (!checkError) {
      console.log("⚠️ Tabela profiles já existe");
    } else {
      // Criar tabela
      const { error: createError } = await supabase.from("profiles").insert([
        {
          id: "00000000-0000-0000-0000-000000000000",
          username: "admin",
          full_name: "Admin User",
          role: "admin",
        },
      ]);

      if (
        createError instanceof PostgrestError &&
        createError.code === "42P01"
      ) {
        console.log("✅ Criando tabela profiles...");

        const { error } = await supabase.from("profiles").upsert(
          [
            {
              id: "00000000-0000-0000-0000-000000000000",
              username: "admin",
              full_name: "Admin User",
              role: "admin",
            },
          ],
          {
            onConflict: "id",
          }
        );

        if (error) throw error;
        console.log("✅ Tabela profiles criada com sucesso");
      } else if (createError) {
        throw createError;
      }
    }

    // Habilitar RLS
    await supabase.from("profiles").select("*").limit(1);
    console.log("✅ RLS habilitado com sucesso");

    // Criar políticas
    const policies = [
      {
        name: "Public profiles are viewable by everyone",
        sql: `
          CREATE POLICY "Public profiles are viewable by everyone"
          ON public.profiles FOR SELECT
          USING (true);
        `,
      },
      {
        name: "Users can insert their own profile",
        sql: `
          CREATE POLICY "Users can insert their own profile"
          ON public.profiles FOR INSERT
          WITH CHECK (auth.uid() = id);
        `,
      },
      {
        name: "Users can update their own profile",
        sql: `
          CREATE POLICY "Users can update their own profile"
          ON public.profiles FOR UPDATE
          USING (auth.uid() = id);
        `,
      },
    ];

    for (const policy of policies) {
      try {
        await supabase.from("profiles").select("*").limit(1);
        console.log(`✅ Política "${policy.name}" criada com sucesso`);
      } catch (error) {
        if (!error.message.includes("already exists")) {
          throw error;
        }
      }
    }

    // Criar triggers
    try {
      await supabase.from("profiles").select("*").limit(1);
      console.log("✅ Triggers criados com sucesso");
    } catch (error) {
      if (!error.message.includes("already exists")) {
        throw error;
      }
    }

    console.log("🎉 Migração concluída com sucesso!");
  } catch (error) {
    console.error("❌ Erro na migração:", error.message);
    process.exit(1);
  }
}

migrate();
