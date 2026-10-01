CREATE TYPE enclosure_type AS ENUM ('outdoor', 'indoor', 'aquatic', 'terrarium');

CREATE TABLE IF NOT EXISTS public.enclosures (
                                                 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    type enclosure_type NOT NULL DEFAULT 'outdoor',
    has_heating_system BOOLEAN NOT NULL DEFAULT false,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
    );

ALTER TABLE public.enclosures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read enclosures"
ON public.enclosures FOR SELECT
                                    TO authenticated
                                    USING (true);

CREATE POLICY "Allow manage enclosures"
ON public.enclosures FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);