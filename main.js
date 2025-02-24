document.addEventListener("DOMContentLoaded", function () {
    const apiUrls = {
        posts: "https://jsonplaceholder.typicode.com/posts",
        albums: "https://jsonplaceholder.typicode.com/albums",
        photos: "https://jsonplaceholder.typicode.com/photos"
    };

    const buttons = document.querySelectorAll("button[data-type]");
    const titleContainer = document.getElementById("title");
    const listContainer = document.getElementById("list");

    function fetchData(type) {
        if (!apiUrls[type]) {
            console.log("API không hợp lệ");
            return;
        }
        
        fetch(apiUrls[type])
            .then(response => {
                if (!response.ok) {
                    throw new Error("Lỗi kết nối API");
                }
                return response.json();
            })
            .then(data => {
                displayData(type, data);
            })
            .catch(error => console.log("Lỗi khi lấy dữ liệu:", error));
    }

    function displayData(type, data) {
        titleContainer.textContent = `Type: ${type}`;
        listContainer.innerHTML = "";
        
        if (!Array.isArray(data)) {
            console.log("Dữ liệu API không hợp lệ");
            return;
        }
        
        data.slice(0, 5).forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.title || item.name || "Không có tiêu đề";
            listContainer.appendChild(li);
        });

        highlightButton(type);
    }

    function highlightButton(activeType) {
        buttons.forEach(button => {
            if (button.dataset.type === activeType) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    }

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const type = this.dataset.type;
            fetchData(type);
        });
    });

    fetchData("posts"); // Load ban đầu
});
