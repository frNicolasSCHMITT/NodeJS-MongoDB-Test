// DELETE

document.querySelectorAll(".deleteBtn").forEach((item) => {
  item.addEventListener("click", function () {
    let id = this.id;
    //alert(id);
    fetch("/quotes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          location.reload();
          return;
        }
        throw new Error("request Failed");
      })
      .catch((error) => console.error(error));
  });
});
