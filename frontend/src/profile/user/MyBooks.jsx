import React from "react";

function MyBooks() {

  const books = [];

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">My Books</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {books.length === 0 && (
          <p>You haven't purchased any books yet.</p>
        )}

      </div>

    </div>
  );
}

export default MyBooks;