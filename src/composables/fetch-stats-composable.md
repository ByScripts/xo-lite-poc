# useFetchStats composable

```vue
<script lang="ts" setup>
import useFetchStats from "@/composables/fetch-stats-composable";
import { Granularity, type HostStats, type VmStats } from "@/libs/xapi-stats";

const vmId = "1d381a66-d1cb-bb7e-50a1-feeab58b293d";
const hostId = "0aea61f4-c9d1-4060-94e8-4eb2024d082c";

const { stats: vmStats } = useFetchStats<VmStats>(
  "vm",
  vmId,
  Granularity.Seconds
);

const { stats: hostStats } = useFetchStats<HostStats>(
  "host",
  hostId,
  Granularity.Seconds
);
</script>
```
