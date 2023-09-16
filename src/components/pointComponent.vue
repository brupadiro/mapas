<template>
    <g style="width:70px; height:70px; color:red; z-index:1000!important" :transform="`translate(${loc.x},${loc.y})`">
        <!--
        <circle cx="50%" cy="50%" r="8" fill-opacity="0" stroke="#258dc8" stroke-width="1px" stroke-opacity="0.5">
            <animate attributeName="r" from="0" to="10" dur="4s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" from="1" to="0" dur="3s" repeatCount="indefinite"></animate>
        </circle>

        -->

        <circle cx="50%" cy="50%" r="4" fill="#4eaba6" stroke="#4eaba6"></circle>

        <text x="51%" y="50%" style="dominant-baseline: middle;font-weight: bold;font-size: 10.5px;" fill="white">
            {{ loc.name.substr(0,15) |capitalize }}...
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
                    return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            }
        },
        props: {
            
            loc: {
                type: Object,
                default: () => {}
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