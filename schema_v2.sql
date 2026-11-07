-- Marocco in tre, aggiornamento 2: profili, voti alle attività, tribunale, valigia, muro e categorie delle spese.
-- Su Supabase: SQL Editor → New query → incolla tutto → Run. Si può rilanciare senza danni e non cancella niente.

-- tabelle della prima versione (se mancano)
create table if not exists public.persone (nome text primary key, patente text, fuoristrada text, budget integer, scenario text, aggiornato timestamptz default now());
create table if not exists public.todo (id uuid primary key default gen_random_uuid(), titolo text not null, entro date, ordine integer default 0, fatto boolean default false, chi text);
create table if not exists public.spese (id uuid primary key default gen_random_uuid(), descrizione text not null, importo numeric(10,2) not null check (importo > 0), pagato_da text not null, creato timestamptz default now());

-- colonne nuove
alter table public.persone add column if not exists soprannome text;
alter table public.persone add column if not exists ruolo text;
alter table public.persone add column if not exists superpotere text;
alter table public.spese add column if not exists categoria text;
alter table public.persone add column if not exists visto timestamptz;

-- tabelle nuove
create table if not exists public.reazioni (
  nome text not null,
  attivita text not null,
  voto text not null check (voto in ('si','forse','no')),
  aggiornato timestamptz default now(),
  primary key (nome, attivita)
);
create table if not exists public.sondaggi (
  nome text not null,
  domanda text not null,
  scelta text not null,
  primary key (nome, domanda)
);
create table if not exists public.valigia (
  nome text not null,
  item text not null,
  fatto boolean default true,
  primary key (nome, item)
);
create table if not exists public.muro (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  testo text not null check (char_length(testo) <= 280),
  creato timestamptz default now()
);

-- permessi: chi ha il link del sito legge e scrive (va bene per un gruppo di amici)
do $$
declare t text;
begin
  foreach t in array array['persone','todo','spese','reazioni','sondaggi','valigia','muro'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "gruppo" on public.%I', t);
    execute format('create policy "gruppo" on public.%I for all to anon using (true) with check (true)', t);
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when others then null;
    end;
  end loop;
end $$;

-- fa rileggere subito le tabelle nuove al sito
notify pgrst, 'reload schema';
