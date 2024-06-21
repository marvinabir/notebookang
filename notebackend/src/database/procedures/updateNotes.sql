
CREATE PROCEDURE UpdateNote
  @Id INT,
  @Title VARCHAR(255),
  @Content TEXT
AS
BEGIN
  UPDATE Notes SET Title = @Title, Content = @Content WHERE Id = @Id;
END;