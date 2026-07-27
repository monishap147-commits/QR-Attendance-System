
CREATE POLICY "Admin read student-faces" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'student-faces' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin insert student-faces" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'student-faces' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update student-faces" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'student-faces' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete student-faces" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'student-faces' AND public.has_role(auth.uid(), 'admin'));
