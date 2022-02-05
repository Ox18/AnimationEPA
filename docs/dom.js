
var button = document.querySelector("#btn_load");
var code_epa = document.querySelector("#code_epa");
var list_container = document.querySelector(".list-container");


class AnimationDB{
    constructor(){
        this.epa = {};
        this.imageURL = "";
        this.animations = [];
    }

    reload(){
        this.checkEPA();
    }

    checkEPA(){
        this.hideAlertEpa();
        this.reset();
        try{
            var epa = JSON.parse(code_epa.value);
            this.epa = epa;
            this.imageURL = document.querySelector("#image_url").value;
            if(this.imageURL === "") throw new Error("URL image input is empty");
            this.playAnimation();
        }catch(ex){
            this.showAlertEpa();
            this.addErrorAlertEpa(ex.message);
        }
    }

    reset(){
        if(this.animations.length >= 1){
            this.animations.forEach((animation)=>{
                animation.remove();
            });
            list_container.innerHTML = "";
        }
    }

    playAnimation(){
        const list = this.getAnimationsName();

        list.map(animationName => {
            let content = document.createElement("div");
            let config = document.createElement("div");
            let preview = document.createElement("div");

            content.classList.add("content");
            config.classList.add("config");
            preview.classList.add("preview");   

            let x = 200;
            let y = 160;
            let animation = new CAnimatedObject2(this.imageURL,this.epa,x,y,preview,1,MOBILE_FPS,!0,LOOP_NORMAL,0,1,!0);
            animation.ChangeEpaAnim(animationName);
            this.animations.push(animation);

            let title = document.createElement("h3");
            title.innerHTML = animationName;
            config.appendChild(title);

            content.appendChild(config);
            content.appendChild(preview);
            list_container.appendChild(content); 
        });
    }    

    getAnimationsName(){
        let list = Object.keys(this.epa);
        let lastList = list.filter(name => name !== "file");
        return lastList;
    }

    hideAlertEpa(){
        document.querySelector("#error_text").style.display = "none";
    }

    showAlertEpa(){
        document.querySelector("#error_text").style.display = "block";
    }


    addErrorAlertEpa(message){
        document.querySelector("#error_text").innerHTML = message;
    }

}

const animationDB = new AnimationDB();

button.addEventListener("click", ()=>{
    animationDB.reload();
});