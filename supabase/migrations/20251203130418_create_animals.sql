create table public.animals (
    id serial primary key,
    name text not null,
    created_at timestamptz default now()
);

insert into public.animals (name) values('Fox'),('Wolf'),('Eagle');
