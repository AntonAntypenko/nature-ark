-- 1. Create ENUM types for strict schema typing
CREATE TYPE animal_status AS ENUM ('healthy', 'sick', 'quarantine', 'recovery');
CREATE TYPE diet_category AS ENUM ('carnivore', 'herbivore', 'omnivore', 'piscivore');

-- 2. Create the core 'animals' table
CREATE TABLE IF NOT EXISTS public.animals (
                                              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

    -- Identification attributes
    name VARCHAR(100) NOT NULL,
    species VARCHAR(150) NOT NULL,
    scientific_name VARCHAR(150),
    inventory_number VARCHAR(50) NOT NULL UNIQUE,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'unknown')),
    birth_date DATE,

    -- Location and operational status
    enclosure_zone VARCHAR(100) NOT NULL, -- e.g., 'Sector A - African Savannah'
    status animal_status NOT NULL DEFAULT 'healthy',

    -- AI modeling and predictive analytics parameters
    weight_kg NUMERIC(6, 2) NOT NULL,
    diet_type diet_category NOT NULL,
    daily_food_norm_kg NUMERIC(5, 2) NOT NULL,
    estimated_daily_cost NUMERIC(8, 2) NOT NULL DEFAULT 0.00, -- Projected daily nutrition cost (UAH)
    is_winter_heating_required BOOLEAN NOT NULL DEFAULT false, -- Seasonal heating factor for AI budget forecasting

-- Metadata
    notes TEXT
    );

-- 3. Create indexes for Data Access Layer (DAL) query performance
CREATE INDEX IF NOT EXISTS idx_animals_species ON public.animals(species);
CREATE INDEX IF NOT EXISTS idx_animals_status ON public.animals(status);
CREATE INDEX IF NOT EXISTS idx_animals_enclosure ON public.animals(enclosure_zone);

-- 4. Configure Row Level Security (RLS) policies
ALTER TABLE public.animals ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can read animal records
CREATE POLICY "Authenticated users can read animals"
ON public.animals
FOR SELECT
               TO authenticated
               USING (true);

-- Policy: Authenticated users can manage animal records
CREATE POLICY "Authenticated users can manage animals"
ON public.animals
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. Seed initial mock dataset for testing and analytics
INSERT INTO public.animals (
    name, species, scientific_name, inventory_number, gender, birth_date,
    enclosure_zone, status, weight_kg, diet_type, daily_food_norm_kg,
    estimated_daily_cost, is_winter_heating_required, notes
) VALUES
      (
          'Simba',
          'African Lion',
          'Panthera leo',
          'ZOO-2024-001',
          'male',
          '2019-05-14',
          'Sector A: Savannah',
          'healthy',
          190.50,
          'carnivore',
          7.50,
          1250.00,
          true,
          'Requires a transition to a high-protein diet in late autumn.'
      ),
      (
          'Maya',
          'Brown Bear',
          'Ursus arctos',
          'ZOO-2024-002',
          'female',
          '2017-03-22',
          'Sector B: Woodland Predators',
          'healthy',
          240.00,
          'omnivore',
          12.00,
          980.00,
          false,
          'Pre-hibernation preparation: increased intake of berries, fish, and nuts.'
      ),
      (
          'Gloria',
          'Common Hippopotamus',
          'Hippopotamus amphibius',
          'ZOO-2024-003',
          'female',
          '2015-08-10',
          'Sector C: Wetlands',
          'healthy',
          1450.00,
          'herbivore',
          40.00,
          850.00,
          true,
          'Requires heated pool water during winter (significant utility budget impact).'
      ),
      (
          'Oscar',
          'Humboldt Penguin',
          'Spheniscus humboldti',
          'ZOO-2024-004',
          'male',
          '2021-11-05',
          'Sector D: Polar Aviary',
          'quarantine',
          4.20,
          'piscivore',
          0.60,
          220.00,
          false,
          'Routine quarantine following transport. Diet: strictly fresh saltwater fish.'
      ),
      (
          'Bruno',
          'Amur Tiger',
          'Panthera tigris altaica',
          'ZOO-2024-005',
          'male',
          '2020-02-18',
          'Sector B: Woodland Predators',
          'healthy',
          215.00,
          'carnivore',
          8.00,
          1400.00,
          false,
          'Optimal body condition. High cold tolerance, no supplementary heating required.'
      );