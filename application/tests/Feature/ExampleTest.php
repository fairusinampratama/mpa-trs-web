<?php
namespace Tests\Feature;
use Tests\TestCase;
class ExampleTest extends TestCase
{
    public function test_landing_is_server_rendered_and_uses_compiled_asset(): void
    {
        $this->get('/')->assertOk()->assertSee('MAPALA TURSINA')->assertSee('Website Under Development')->assertSee('/build/assets/', false);
    }
    public function test_health_discloses_only_status_and_revision(): void
    {
        $this->get('/health')->assertOk()->assertExactJson(['status' => 'ok', 'revision' => 'development'])->assertHeader('Cache-Control', 'no-store, private');
    }
    public function test_unknown_route_is_a_safe_404(): void { $this->get('/not-a-route')->assertNotFound()->assertDontSee('Stack trace'); }
    public function test_production_defaults_do_not_require_database(): void
    {
        $this->assertFalse(config('app.debug')); $this->assertSame('sync', config('queue.default'));
    }
}
