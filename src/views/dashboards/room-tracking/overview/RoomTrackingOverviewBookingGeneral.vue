<template>
  <v-card flat>
    <v-card-text>
      <v-sheet>
        <div class="d-flex align-center">
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>{{ icons.mdiChevronLeft }}</v-icon>
          </v-btn>
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>{{ icons.mdiChevronRight }}</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
        </div>
      </v-sheet>
    </v-card-text>
    <v-card-text>
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          v-model="value"
          :events="events"
          @click:event="showEvent"
          color="primary"
          :type="$vuetify.breakpoint.mobile ? 'day' : 'week'"
        >
          <template v-slot:day-body="{ date, week }">
            <div class="v-current-time" :class="{ first: date === week[0].date }" :style="{ top: nowY }"></div>
          </template>
          <template v-slot:event="{ event, eventParsed, timed }">
            <!-- <div class="pa-1 d-flex align-center text-truncate " style="width:100%">
              <div class="v-avatar-group">
                <v-avatar
                  size="36px"
                  color="#033"
                  v-for="(item, i) in event.user.length <= 3 ? event.user : 3"
                  :key="i"
                >
                  <v-img v-if="event.user[i].img != ''" :src="event.user[i].img"></v-img>
                  <span class="text-h6" v-else>{{ event.user[i].name }}</span>
                </v-avatar>
              </div>
              <div>
                <span class="d-block text-truncate ml-2">
                  {{ event.name }}
                </span>
              </div>
            </div> -->
            <div class="pa-1 text-truncate">
              <strong>{{ eventParsed.start.time }} - {{ eventParsed.end.time }}</strong>
              <p>{{ event.name }}</p>
            </div>
          </template>
        </v-calendar>
        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
          <v-card min-width="200px" max-width="500px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text class="pt-5">
              <span v-html="selectedEvent.details"></span>
              <!-- <span>{{ selectedEvent.user }}</span> -->
              <div class="v-avatar-group" v-if="selectedEvent.user">
                <v-tooltip bottom v-for="(item, i) in selectedEvent.user.length <= 3 ? selectedEvent.user : 3" :key="i">
                  <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on">
                      <v-avatar size="36px" color="#033">
                        <v-img v-if="selectedEvent.user[i].img != ''" :src="selectedEvent.user[i].img"></v-img>
                        <span class="text-h6" v-else>{{ selectedEvent.user[i].name }}</span>
                      </v-avatar>
                    </div>
                  </template>
                  <span>{{ selectedEvent.user[i].name }}</span>
                </v-tooltip>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false"> Cancel </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js'

export default {
  props: {
    events: {
      type: Array,
      default() {
        return [
          {
            name: 'Weekly Meeting Weekly Meeting Weekly Meeting',
            start: '2022-08-28 09:00',
            end: '2022-08-28 10:00',
            timed: false,
            color: '#2196F3',
            user: [
              { name: 'john', img: 'https://picsum.photos/id/11/500/300' },
              { name: 'john', img: '' },
              { name: 'john', img: 'https://picsum.photos/id/11/500/300' },
              { name: 'john', img: 'https://picsum.photos/id/11/500/300' },
            ],
          },
        ]
      },
    },
  },
  data() {
    return {
      today: this.$moment().format('YYYY-MM-DD'),
      ready: false,
      value: '',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      icons: {
        mdiChevronRight,
        mdiChevronLeft,
      },
    }
  },
  computed: {
    cal() {
      return this.ready ? this.$refs.calendar : null
    },
    nowY() {
      return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
    },
  },
  mounted() {
    this.ready = true
    this.scrollToTime()
    this.updateTime()
  },
  methods: {
    getCurrentTime() {
      return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0
    },
    scrollToTime() {
      const time = this.getCurrentTime()
      console.log(time)
      const first = Math.max(0, time - (time % 30) - 30)

      this.cal.scrollToTime(first)
    },
    updateTime() {
      setInterval(() => this.cal.updateTimes(), 60 * 1000)
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => (this.selectedOpen = true)))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
  },
}
</script>

<style lang="scss">
.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

  &.first::before {
    content: '';
    position: absolute;
    background-color: #ea4335;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}
</style>
