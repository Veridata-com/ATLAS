-- Create the guides table
create table if not exists public.guides (
  "id" uuid primary key default gen_random_uuid(),
  "title" text not null,
  "summary" text,
  "whatScienceSays" text[] default '{}',
  "whatToDo" text[] default '{}',
  "whoThisIsFor" text,
  "whatNotToDo" text[] default '{}',
  "sources" text[] default '{}',
  "category" text,
  "tags" text[] default '{}',
  "createdAt" timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.guides enable row level security;

-- Create a policy that allows anyone to read guides
create policy "Allow public read access"
  on public.guides
  for select
  to public
  using (true);

-- Create a policy that allows authenticated users (with service role) to insert/update/delete
-- This is useful if you want to manage content via the Supabase dashboard or an admin app
create policy "Enable all access for service role"
  on public.guides
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
