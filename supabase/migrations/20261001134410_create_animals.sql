CREATE TYPE animal_status AS ENUM ('healthy', 'sick', 'quarantine', 'recovery');
CREATE TYPE diet_category AS ENUM ('carnivore', 'herbivore', 'omnivore', 'piscivore');
CREATE TYPE animal_gender AS ENUM ('male', 'female', 'unknown');

CREATE TABLE IF NOT EXISTS public.animals (
                                              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enclosure_id UUID REFERENCES public.enclosures(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(150) NOT NULL,
    scientific_name VARCHAR(150),
    inventory_number VARCHAR(50) NOT NULL UNIQUE,
    gender animal_gender DEFAULT 'unknown',
    birth_date DATE,
    status animal_status NOT NULL DEFAULT 'healthy',
    weight_kg NUMERIC(6, 2) NOT NULL CHECK (weight_kg > 0),
    diet_type diet_category NOT NULL,
    daily_food_norm_kg NUMERIC(6, 2) NOT NULL CHECK (daily_food_norm_kg > 0),
    estimated_daily_cost NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (estimated_daily_cost >= 0),
    is_winter_heating_required BOOLEAN NOT NULL DEFAULT false,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
    );

CREATE INDEX idx_animals_enclosure_id ON public.animals(enclosure_id);

ALTER TABLE public.animals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read animals"
ON public.animals FOR SELECT
                                 TO authenticated
                                 USING (true);

CREATE POLICY "Allow manage animals"
ON public.animals FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);