
CREATE TABLE services (
  id        text PRIMARY KEY,
  title     text NOT NULL,
  description text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_services" ON services FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_services" ON services FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_services" ON services FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_services" ON services FOR DELETE TO authenticated USING (true);

CREATE TABLE projects (
  id          text PRIMARY KEY,
  title       text NOT NULL,
  category    text NOT NULL,
  year        text NOT NULL,
  image_url   text NOT NULL,
  span        text NOT NULL DEFAULT '',
  description text NOT NULL,
  sort_order  integer NOT NULL DEFAULT 0
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_projects" ON projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_projects" ON projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_projects" ON projects FOR DELETE TO authenticated USING (true);

CREATE TABLE project_gallery (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id text NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url  text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE project_gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_project_gallery" ON project_gallery FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_project_gallery" ON project_gallery FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_project_gallery" ON project_gallery FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_project_gallery" ON project_gallery FOR DELETE TO authenticated USING (true);
