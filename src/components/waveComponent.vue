<template>
    <g style="width:70px; height:70px; color:red; " :transform="`translate(${loc.x},${loc.y})`">
    <circle cx="50%" cy="50%" r="0" fill-opacity="0" stroke="orange" stroke-width="1.5px" stroke-opacity="1">
      <animate attributeName="r" from="0" to="40" dur="4s" repeatCount="indefinite" />
      <animate attributeName="stroke-opacity" from="1" to="0" dur="3s" repeatCount="indefinite">
      </animate>
    </circle>

    <circle cx="50%" cy="50%" r="0" fill-opacity="0" stroke="orange" stroke-width="1.5px" stroke-opacity="1">
      <animate attributeName="r" from="0" to="40" dur="4s" repeatCount="indefinite" begin="1s" />
      <animate attributeName="stroke-opacity" from="1" to="0" dur="3s" repeatCount="indefinite" begin="0.75s">
      </animate>
    </circle>

    <circle cx="50%" cy="50%" r="0" fill-opacity="0" stroke="orange" stroke-width="1.5px" stroke-opacity="1">
      <animate attributeName="r" from="0" to="40" dur="4s" repeatCount="indefinite" begin="2s" />
      <animate attributeName="stroke-opacity" from="1" to="0" dur="3s" repeatCount="indefinite" begin="1.5s">
      </animate>
    </circle>
    <circle cx="50%" cy="50%" r="0" fill-opacity="0" stroke="orange" stroke-width="1.5px" stroke-opacity="1">
      <animate attributeName="r" from="0" to="40" dur="4s" repeatCount="indefinite" begin="3s" />
      <animate attributeName="stroke-opacity" from="1" to="0" dur="3s" repeatCount="indefinite" begin="1.5s">
      </animate>
    </circle>

    <circle cx="50%" cy="50%" r="4" fill="#f2a97f" stroke="orange"></circle>
    <text x="51%" y="50%"  
 style="dominant-baseline: middle;font-weight: bold;font-size: 14px;background:black" fill="white">
            {{ formatLocName(loc.name) | capitalize  }}
            <!--
            <tspan v-for="(line, index) in formattedText" :key="index" x="51%" :dy="index > 0 ? '1em' : 0">
                {{ line }}
            </tspan>

            -->
        </text>


  </g>
</template>

<script>
  export default {
    filters:{
            capitalize(value){
                    if(!value) return ''
                    value = value.toLowerCase().toString()
                    value= value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                    value = value.replace("Fc","FC")
                    value = value.replace("Fo","FO")
                    return value

                  }
        },
        methods:{
          formatLocName(name) {
                let newName = JSON.parse(JSON.stringify(name));
                if (newName.includes("FILM COMMISSION")) {
                    return newName.replace("FILM COMMISSION","FC")
                } else if (newName.includes("FILM OFFICE")) {
                    return newName.replace("FILM OFFICE","FO")
                }
                return newName.toUpperCase()
            }
        },


   props:{
            loc:{
                type:Object,
                default:()=>{}
            }
        },
        computed:{
          formattedText() {
                let words = this.loc.name.split(' ');
                let lines = [];
                let line = '';
                for (let i = 0; i < words.length; i++) {
                    line += words[i];
                    if ((i + 1) % 2 === 0 && i !== words.length - 1) {
                        lines.push(line);
                        line = '';
                    } else if (i !== words.length - 1) {
                        line += ' ';
                    }
                }
                lines.push(line);
                return lines;
            }

        }

        }


</script>
<style>

</style>