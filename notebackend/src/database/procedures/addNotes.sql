
CREATE PROCEDURE AddNote
  @Title VARCHAR(255),
  @Content TEXT
AS
BEGIN
  INSERT INTO Notes (Title, Content) VALUES (@Title, @Content);
END;