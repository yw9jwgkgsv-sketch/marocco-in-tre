-- Marocco in tre, aggiornamento 3: documenti di viaggio, profili personalizzati, idee proposte da voi.
-- Su Supabase: SQL Editor → New query → incolla tutto → Run. Si può rilanciare senza danni e non cancella niente.

-- profilo personalizzato
alter table public.persone add column if not exists colore text;
alter table public.persone add column if not exists emoji text;
alter table public.persone add column if not exists tormentone text;

-- idee proposte da voi, zona per zona
create table if not exists public.proposte (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  titolo text not null check (char_length(titolo) <= 80),
  zona text not null,
  prezzo integer default 0,
  battuta text check (char_length(battuta) <= 200),
  creato timestamptz default now()
);

-- i documenti caricati (i file stanno nello spazio «documenti»)
create table if not exists public.documenti (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  titolo text not null check (char_length(titolo) <= 80),
  categoria text not null default 'altro',
  path text not null,
  file text,
  tipo text,
  size integer,
  creato timestamptz default now()
);

do $$
declare t text;
begin
  foreach t in array array['proposte','documenti'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "gruppo" on public.%I', t);
    execute format('create policy "gruppo" on public.%I for all to anon using (true) with check (true)', t);
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when others then null;
    end;
  end loop;
end $$;

-- lo spazio per i file: massimo 10 MB a file, solo PDF e immagini
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('documenti', 'documenti', true, 10485760, array['application/pdf','image/jpeg','image/png','image/heic','image/heif','image/webp'])
on conflict (id) do nothing;

drop policy if exists "documenti leggi" on storage.objects;
drop policy if exists "documenti carica" on storage.objects;
drop policy if exists "documenti elimina" on storage.objects;
create policy "documenti leggi" on storage.objects for select to anon using (bucket_id = 'documenti');
create policy "documenti carica" on storage.objects for insert to anon with check (bucket_id = 'documenti');
create policy "documenti elimina" on storage.objects for delete to anon using (bucket_id = 'documenti');

notify pgrst, 'reload schema';
